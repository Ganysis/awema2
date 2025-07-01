export interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
    helpful: number;
    images?: string[];
    response?: {
        author: string;
        comment: string;
        date: string;
    };
}
export interface AggregateRating {
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
}
export interface ReviewsBlockData {
    title: string;
    subtitle?: string;
    reviews: Review[];
    showRating: boolean;
    showImages: boolean;
    layout: 'grid' | 'list' | 'carousel' | 'masonry';
    itemsPerRow: 1 | 2 | 3 | 4;
    enableFilters: boolean;
    enableSorting: boolean;
    enablePagination: boolean;
    itemsPerPage: number;
}
//# sourceMappingURL=review.types.d.ts.map
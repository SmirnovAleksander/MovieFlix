export interface Review {
    kinopoiskId: number;
    type: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
    date: string;
    positiveRating: number;
    negativeRating: number;
    author: string;
    title: string;
    description: string;
}
export interface ReviewsResponse {
    total: number;
    totalPages: number;
    totalPositiveReviews: number;
    totalNegativeReviews: number;
    totalNeutralReviews: number;
    items: Review[];
}
export interface ReviewItem {
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
    items: ReviewItem[];
}

export interface ReviewsQueryParams {
    id: string;
    page: number;
    order: 'DATE_ASC'
        | 'DATE_DESC'
        | 'USER_POSITIVE_RATING_ASC'
        | 'USER_POSITIVE_RATING_DESC'
        | 'USER_NEGATIVE_RATING_ASC'
        | 'USER_NEGATIVE_RATING_DESC'
}
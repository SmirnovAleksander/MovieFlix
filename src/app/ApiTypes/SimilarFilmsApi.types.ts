export interface SimilarFilms {
    total: number;
    items: SimilarFilmItem[];
}

export interface SimilarFilmItem {
    filmId: number;
    nameRu: string;
    nameEn: string;
    nameOriginal: string;
    posterUrl: string;
    posterUrlPreview: string;
    relationType: string | 'SIMILAR';
}
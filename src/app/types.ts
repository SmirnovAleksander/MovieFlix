export interface Movie {
    kinopoiskId: number,
    imdbId?: string,
    nameRu?: string | null,
    nameEn?: string | null,
    nameOriginal?: string,
    countries?: { country: string }[],
    genres?: { genre: string }[],
    ratingKinopoisk?: number | null,
    ratingImdb?: number | null,
    year?: number,
    type?: string,
    posterUrl?: string,
    posterUrlPreview?: string,
    coverUrl?: string | null,
    logoUrl?: string | null,
    description?: string,
    ratingAgeLimits?: string | null,
}

export interface Genre {
    id: number;
    genre: string;
}

export interface Country {
    id: number;
    country: string;
}


export interface FilmInfo {
    kinopoiskId: number;
    kinopoiskHDId?: string;
    imdbId?: string;
    nameRu: string;
    nameEn?: string | null;
    nameOriginal?: string;
    posterUrl: string;
    posterUrlPreview: string;
    coverUrl?: string | null;
    logoUrl?: string | null;
    reviewsCount: number;
    ratingGoodReview?: number | null;
    ratingGoodReviewVoteCount?: number;
    ratingKinopoisk?: number | null;
    ratingKinopoiskVoteCount?: number;
    ratingImdb?: number | null;
    ratingImdbVoteCount?: number;
    ratingFilmCritics?: number | null;
    ratingFilmCriticsVoteCount?: number;
    ratingAwait?: number | null;
    ratingAwaitCount?: number;
    ratingRfCritics?: number | null;
    ratingRfCriticsVoteCount?: number;
    webUrl: string;
    year: number;
    filmLength?: number | null;
    slogan?: string | null;
    description?: string | null;
    shortDescription?: string | null;
    editorAnnotation?: string | null;
    isTicketsAvailable: boolean;
    productionStatus?: string | null;
    type: string;
    ratingMpaa?: string | null;
    ratingAgeLimits?: string | null;
    countries: Array<{
        country: string;
    }>;
    genres: Array<{
        genre: string;
    }>;
    startYear?: number | null;
    endYear?: number | null;
    serial: boolean;
    shortFilm: boolean;
    completed: boolean;
    hasImax: boolean;
    has3D: boolean;
    lastSync: string;
}

export interface StaffMember {
    staffId: number;
    nameRu: string;
    nameEn: string;
    description: string | null;
    posterUrl: string;
    professionText: string;
    professionKey: string;
}


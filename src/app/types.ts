export interface Movie {
    kinopoiskId: number,
    imdbId: string,
    nameRu: string | null,
    nameEn: string | null,
    nameOriginal: string,
    countries: { country: string }[],
    genres: { genre: string }[],
    ratingKinopoisk: number | null,
    ratingImdb: number | null,
    year: number,
    type: string,
    posterUrl: string,
    posterUrlPreview: string,
    coverUrl: string | null,
    logoUrl: string | null,
    description: string,
    ratingAgeLimits: string | null,
}

export interface Genre {
    id: number;
    genre: string;
}

export interface Country {
    id: number;
    country: string;
}

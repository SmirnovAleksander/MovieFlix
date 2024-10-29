import {Country, Genre} from "../global.types.ts";

export interface FilmItemCollection {
    kinopoiskId: number;
    imdbId: string | null;
    nameRu: string | null;
    nameEn: string | null;
    nameOriginal: string | null;
    countries: Country[];
    genres: Genre[];
    ratingKinopoisk: number | null;
    ratingImdb: number | null;
    year: number;
    type: 'FILM' | 'TV_SERIES' | string;
    posterUrl: string;
    posterUrlPreview: string;
    coverUrl: string | null;
    logoUrl: string | null;
    description: string | null;
    ratingAgeLimits: string | null;
}
export interface FilmsCollections {
    total: number;
    totalPages: number;
    items: FilmItemCollection[];
}
export interface FilmsCollectionsQueryParams {
    type: string;
    page: number;
}
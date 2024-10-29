import {Country, Genre} from "../global.types.ts";

export interface FilmItem {
    kinopoiskId: number;
    imdbId: string | null;
    nameRu: string | null ;
    nameEn: string | null;
    nameOriginal: string | null;
    countries: Country[];
    genres: Genre[];
    ratingKinopoisk: number | null;
    ratingImdb: number | null;
    year: number;
    type: 'FILM' | 'TV_SERIES' | 'TV_SHOW' | 'MINI_SERIES' | 'ALL' | string;
    posterUrl: string;
    posterUrlPreview: string;
}
export interface FilmsItems {
    total: number;
    totalPages: number;
    items: FilmItem[];
}

export interface FilmsItemsQueryParams {
    countries: string;
    genreId: string;
    order?: 'NUM_VOTE' | 'RATING' | 'YEAR' | string;
    type?: 'FILM' | 'TV_SERIES' | 'TV_SHOW' | 'MINI_SERIES' | 'ALL' | string;
    year?: string | number;
    page: number;
    keyword?: string;
}

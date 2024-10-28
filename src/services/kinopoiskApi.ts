import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Country, FilmInfo, Genre, StaffMember} from "../app/types.ts";

const excludeGenres = [
    ""
]
export interface FiltersResponse {
    genres: Genre[];
    countries: Country[];
}
export interface SequelAndPrequel {
    filmId: number;
    nameRu: string;
    nameEn?: string;
    nameOriginal?: string;
    posterUrl: string;
    posterUrlPreview: string;
    relationType: string;
    kinopoiskId: number;
}

export const kinopoiskApi = createApi({
    reducerPath: 'kinopoiskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://kinopoiskapiunofficial.tech/api',
        prepareHeaders: headers => {
            headers.set('X-API-KEY', '73d4ab20-9100-4d3d-b0d5-72acaf3a4d5d')
            // '879c5663-4b59-4718-b205-6285fa1d4d40'
            headers.set('Content-Type', 'application/json')
        }
    }),

    endpoints: (builder) => ({
        getFilmsTop: builder.query({
            query: ({type, page}) =>
                `/v2.2/films/collections?type=${type}&page=${page}`,
        }),
        getFilms: builder.query({
            query: ({countries, genreId, order = 'NUM_VOTE', type = 'FILM', year, page}) =>
                `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&yearTo=${year}&yearFrom=${year}&page=${page}`
        }),
        getGenresAndCountries: builder.query<FiltersResponse, void>({
            query: () => `/v2.2/films/filters`,
            transformResponse: (response: FiltersResponse) => ({
                ...response,
                genres: response.genres.filter(
                    (el) => !excludeGenres.includes(el.genre),
                )
            })
        }),
        getFilmInfo: builder.query<FilmInfo, {id: string}>({
            query: ({id}) =>
                `/v2.2/films/${id}`
        }),
        getSequelsAndPrequels: builder.query({
            query: ({id}) =>
                `/v2.1/films/${id}/sequels_and_prequels`,
            transformResponse: (response: Array<Omit<SequelAndPrequel, 'kinopoiskId'>>) => response.map((el) => ({
                ...el,
                kinopoiskId: el.filmId
            }))
        }),
        getStuff: builder.query<StaffMember[], { id: string }>({
            query: ({id}) =>
                `/v1/staff?filmId=${id}`
        }),
    }),
});

export const {
    useGetFilmsTopQuery,
    useGetFilmsQuery,
    useGetGenresAndCountriesQuery,
    useGetFilmInfoQuery,
    useGetSequelsAndPrequelsQuery,
    useGetStuffQuery,
} = kinopoiskApi
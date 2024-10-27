import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Country, Genre} from "../app/types.ts";

const excludeGenres = [
    ""
]
export interface FiltersResponse {
    genres: Genre[];
    countries: Country[];
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
        })
    }),
});

export const {useGetFilmsTopQuery, useGetFilmsQuery, useGetGenresAndCountriesQuery} = kinopoiskApi
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const kinopoiskApi = createApi({
    reducerPath: 'kinopoiskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://kinopoiskapiunofficial.tech/api',
        prepareHeaders: headers => {
            headers.set('X-API-KEY', '879c5663-4b59-4718-b205-6285fa1d4d40')
            headers.set('Content-Type', 'application/json')
        }
    }),

    endpoints: (builder) => ({
        getFilmsTop: builder.query({
            query: ({type, page}) =>
                `/v2.2/films/collections?type=${type}&page=${page}`,
        }),
        getFilms: builder.query({
            query: ({countries, genreId, order, type = 'FILM', year, page}) =>
                `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&year=${year}&page=${page}`
        })
    }),
});

export const { useGetFilmsTopQuery, useGetFilmsQuery } = kinopoiskApi
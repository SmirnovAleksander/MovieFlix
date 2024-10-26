import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const kinopoiskApi = createApi({
    reducerPath: 'kinopoiskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://kinopoiskapiunofficial.tech/api',
        prepareHeaders: headers => {
            headers.set('X-API-KEY', )
            headers.set('Content-Type', 'application/json')
        }
    }),

    endpoints: (builder) => ({
        getFilmsTop: builder.query({
            query: ({type, page}) =>
                `/v2.2/films/collections?type=${type}&page=${page}`,
        }),
    }),
});

export const { useGetFilmsTopQuery } = kinopoiskApi
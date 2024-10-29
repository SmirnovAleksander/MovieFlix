import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {FilmsCollections, FilmsCollectionsQueryParams} from "../app/ApiTypes/FilmCollectionApi.types.ts";
import {FilmsItems, FilmsItemsQueryParams} from "../app/ApiTypes/FilmItemApi.types.ts";
import {GenresAndCountries} from "../app/ApiTypes/GenresAndCountriesApi.types.ts";
import {FilmInfo} from "../app/ApiTypes/FilmInfoApi.types.ts";
import {SequelAndPrequel, SequelsAndPrequels} from "../app/ApiTypes/SequelsAndPrequelsApi.types.ts";
import {StaffMembers} from "../app/ApiTypes/StaffMembersApi.types.ts";
import {PersonInfo} from "../app/ApiTypes/StaffMemberInfoApi.types.ts";
import {FilmImagesCollection, FilmImagesQueryParams} from "../app/ApiTypes/FilmImagesApi.types.ts";

const excludeGenres = [
    ""
]

export const kinopoiskApi = createApi({
    reducerPath: 'kinopoiskApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://kinopoiskapiunofficial.tech/api',
        prepareHeaders: headers => {
            headers.set('X-API-KEY', '73d4ab20-9100-4d3d-b0d5-72acaf3a4d5d')
            // '73d4ab20-9100-4d3d-b0d5-72acaf3a4d5d'
            // '879c5663-4b59-4718-b205-6285fa1d4d40'
            headers.set('Content-Type', 'application/json')
        }
    }),

    endpoints: (builder) => ({
        getFilmsTop: builder.query<FilmsCollections, FilmsCollectionsQueryParams>({
            query: ({type, page}) =>
                `/v2.2/films/collections?type=${type}&page=${page}`,
            transformResponse: (response: FilmsCollections) => {
                if (response.total === 0 || response.totalPages === 0 || response.items.length === 0) {
                    return {
                        ...response,
                        items: []
                    };
                }
                return response;
            },
        }),
        getFilms: builder.query<FilmsItems, FilmsItemsQueryParams>({
            query: ({countries, genreId, order = 'NUM_VOTE', type = 'FILM', year, page, keyword = ''}) =>
                `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&yearTo=${year}&yearFrom=${year}&page=${page}&keyword=${keyword}`
        }),
        getGenresAndCountries: builder.query<GenresAndCountries, void>({
            query: () => `/v2.2/films/filters`,
            transformResponse: (response: GenresAndCountries) => ({
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
        getSequelsAndPrequels: builder.query<SequelsAndPrequels, {id: string}>({
            query: ({id}) =>
                `/v2.1/films/${id}/sequels_and_prequels`,
            transformResponse: (response: Array<Omit<SequelAndPrequel, 'kinopoiskId'>>) => response.map((el) => ({
                ...el,
                kinopoiskId: el.filmId
            }))
        }),
        getStuff: builder.query<StaffMembers, { id: string }>({
            query: ({id}) =>
                `/v1/staff?filmId=${id}`
        }),
        getStuffInfo: builder.query<PersonInfo, { id: string }>({
            query: ({id}) =>
                `/v1/staff/${id}`
        }),
        getFilmImages:  builder.query<FilmImagesCollection, FilmImagesQueryParams>({
            query: ({id, type, page}) =>
                `/v2.2/films/${id}/images?type=${type}&page=${page}`
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
    useGetStuffInfoQuery,
    useGetFilmImagesQuery
} = kinopoiskApi
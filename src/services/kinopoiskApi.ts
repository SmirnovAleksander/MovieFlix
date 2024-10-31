import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {FilmsCollections, FilmsCollectionsQueryParams} from "../app/ApiTypes/FilmCollectionApi.types.ts";
import {FilmsItems, FilmsItemsQueryParams} from "../app/ApiTypes/FilmItemApi.types.ts";
import {GenresAndCountries} from "../app/ApiTypes/GenresAndCountriesApi.types.ts";
import {FilmInfo} from "../app/ApiTypes/FilmInfoApi.types.ts";
import {SequelAndPrequel, SequelsAndPrequels} from "../app/ApiTypes/SequelsAndPrequelsApi.types.ts";
import {StaffMembers} from "../app/ApiTypes/StaffMembersApi.types.ts";
import {PersonInfo} from "../app/ApiTypes/StaffMemberInfoApi.types.ts";
import {FilmImagesCollection, FilmImagesQueryParams} from "../app/ApiTypes/FilmImagesApi.types.ts";
import {TrailerData} from "../app/ApiTypes/FilmTrailersApi.types.ts";
import {ReviewsQueryParams, ReviewsResponse} from "../app/ApiTypes/FilmItemReviews.types.ts";

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
            // '1b900727-d411-41a7-b5f4-80f7d54d985d'
            // 'c6c7bde6-9691-4b8a-90c4-0065e1bf5f12'
            // '1b64ce6c-a0b7-46d7-97f2-8b09e8c498a3'
            // '21e6bd31-a673-404e-9c38-f902017dc168'
            headers.set('Content-Type', 'application/json')
        },
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
            keepUnusedDataFor: 60 * 5,
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
                `/v2.2/films/${id}`,
            transformResponse: (response: FilmInfo): Partial<FilmInfo> => {
                return {
                    posterUrl: response.posterUrl,
                    nameRu: response.nameRu,
                    webUrl: response.webUrl,
                    imdbId: response.imdbId,
                    year: response.year,
                    countries: response.countries,
                    genres: response.genres,
                    filmLength: response.filmLength ?? null,
                    ratingKinopoisk: response.ratingKinopoisk ?? null,
                    ratingImdb: response.ratingImdb ?? null,
                    description: response.description ?? null,
                    nameEn: response.nameEn ?? null,
                    kinopoiskId: response.kinopoiskId,
                    posterUrlPreview: response.posterUrlPreview
                };
            }
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
                `/v2.2/films/${id}/images?type=${type}&page=${page}`,

        }),
        getFilmTrailer:  builder.query<TrailerData, { id: string }>({
            query: ({id}) =>
                `/v2.2/films/${id}/videos`,
            transformResponse: (response: TrailerData) => {
                const youtubeTrailers = response.items.filter((trailer) => trailer.site === 'YOUTUBE');
                return {
                    ...response,
                    items: youtubeTrailers.length > 0 ? youtubeTrailers : []
                };
            }
        }),
        getFilmReviews:  builder.query<ReviewsResponse, ReviewsQueryParams>({
            query: ({id, page, order}) =>
                `/v2.2/films/${id}/reviews?page=${page}&order=${order}`,
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
    useGetFilmImagesQuery,
    useGetFilmTrailerQuery,
    useLazyGetFilmReviewsQuery
} = kinopoiskApi
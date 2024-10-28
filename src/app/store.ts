import { configureStore } from '@reduxjs/toolkit'
import currentQueryReducer from "../features/currentQuerySlice.ts";
import {kinopoiskApi} from "../services/kinopoiskApi.ts";
import searchQueryReducer from "../features/searchQuerySlice.ts";

export const store = configureStore({
    reducer: {
        [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
        currentQuery: currentQueryReducer,
        searchQuery: searchQueryReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(kinopoiskApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
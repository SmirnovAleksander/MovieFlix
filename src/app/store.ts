import { configureStore } from '@reduxjs/toolkit'
import currentQueryReducer from "../features/currentQuerySlice.ts";
import {kinopoiskApi} from "../services/kinopoiskApi.ts";

export const store = configureStore({
    reducer: {
        [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
        currentQuery: currentQueryReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(kinopoiskApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
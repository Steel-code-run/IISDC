import {configureStore} from "@reduxjs/toolkit";
import {grantsApi} from "../api/grants.api";
import {competitionsApi} from "../api/competitions.api";
import {internshipsApi} from '../api/internships.api';
import {auxiliaryApi} from "../api/auxiliaryRequests.api";

export const store = configureStore({
    reducer: {
        [grantsApi.reducerPath]: grantsApi.reducer,
        [competitionsApi.reducerPath]: competitionsApi.reducer,
        [internshipsApi.reducerPath]: internshipsApi.reducer,
        [auxiliaryApi.reducerPath]: auxiliaryApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(grantsApi.middleware, competitionsApi.middleware, internshipsApi.middleware, auxiliaryApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
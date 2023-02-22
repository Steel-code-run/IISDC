import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:3003/',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQllQQVNTIiwicm9sZSI6OTk5LCJpZCI6LTEwMCwiaWF0IjoxNjc3MDYzODczLCJleHAiOjE3MDUwNTc0NzN9.tMDWPoOEZ2_m4ynvu1uB3noj_p-raHpMU7FHklXjfUY'
            },
            method: 'POST'

        }),
    endpoints: (builder) => ({
        getGrants: builder.query<any, void>({
            query: () => 'grants/get',

        }),
        getVacancies: builder.query<any, void>({
            query: () => 'vacancies/get',
        }),
        getInternships: builder.query<any, void>({
            query: () => 'internships/get',
        }),
        getCompetitions: builder.query<any, void>({
            query: () => 'competitions/get',
        }),

    })
});

export const {
    useGetGrantsQuery,
    useGetCompetitionsQuery,
    useGetInternshipsQuery,
    useGetVacanciesQuery
} = postsApi;

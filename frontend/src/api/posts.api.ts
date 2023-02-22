import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:3003/',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQllQQVNTIiwicm9sZSI6OTk5LCJpZCI6MiwiaWF0IjoxNjc2NDk3NTQ0LCJleHAiOjE3MDQ0OTExNDR9.7_WhMbLUfk-WP3lm0JAzsIBoZB8UtZ0tJBFMSPD6_gM'
            }

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

import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface IGetGrants {
    limit: number,
    from: number,
    namePost: string
}


export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.REACT_APP_SERVER_URL,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQllQQVNTIiwicm9sZSI6OTk5LCJpZCI6LTEwMCwiaWF0IjoxNjc3MDYzODczLCJleHAiOjE3MDUwNTc0NzN9.tMDWPoOEZ2_m4ynvu1uB3noj_p-raHpMU7FHklXjfUY'
            },
            method: 'POST'

        }),
    endpoints: (builder) => ({
        getGrants: builder.query<any, IGetGrants>({
            query: ({limit, from, namePost}) => {
                return {
                    url: 'grants/get',
                    body: {
                        limit: (namePost) ? 1 : limit,
                        from,
                        namePost
                    }
                }
            }
        }),
        getCountGrants: builder.query<any, string>({
            query: (namePost: string) => {
                return {
                    url: 'grants/count',
                    body: {
                        namePost
                    }
                }
            }
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
        getBeautifulStats : builder.query<any, void>({
            query: () => 'stats/getBeautifulStats'
        })

    })
});

export const {
    useGetBeautifulStatsQuery,
    useGetGrantsQuery,
    useGetCountGrantsQuery,
    useGetCompetitionsQuery,
    useGetInternshipsQuery,
    useGetVacanciesQuery
} = postsApi;

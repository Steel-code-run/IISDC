import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// import {IUpdateData} from "../components/UI/PopupPost/PopupPost";

export interface IGetCompetitions {
    limit: number,
    from: number,
    namePost: string,
    direction?: string[] | string,
    token: string | null
}

interface IGetCountCompetitions {
    namePost?: string,
    direction?: string[] | string,
    token: string | null
}
export const competitionsApi = createApi({
    reducerPath: 'competitionsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.REACT_APP_SERVER_URL,
        }),
    tagTypes: ['Competitions'],
    endpoints: (builder) => ({

        getCompetitions: builder.query<any, IGetCompetitions>({
            query: ({limit, from, namePost, direction, token}) => {
                return {
                    url: 'v2/competitions/get',
                    params: {
                        limit: limit,
                        from,
                        namePost,
                        direction : direction
                    },
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                }
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result?.data.map(({id}: any) => ({type: 'Competitions' as const, id})),
                        {type: 'Competitions', id: 'LIST'},
                    ]
                    : [{type: 'Competitions', id: 'LIST'}],
        }),
        getCountСompetitions: builder.query<any, IGetCountCompetitions>({
            query: ({namePost, direction, token}) => {
                return {
                    url: 'v2/competitions/count',
                    params: {
                        namePost,
                        'direction[]': direction
                    },
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                }
            }
        }),

        // updateCompetitions: builder.mutation<any, IUpdateData>({
        //     query: (updateData) => ({
        //         url: 'competitions/update',
        //         body: updateData
        //     }),
        //     invalidatesTags: [{type: 'Competitions', id: 'LIST'}]
        // }),

    })
});

export const {
    useGetCountСompetitionsQuery,
    useGetCompetitionsQuery
} = competitionsApi;

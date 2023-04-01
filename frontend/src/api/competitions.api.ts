import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TTypesUpdateData} from "../types/types";

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
interface IUpdateInput {
    updateData: TTypesUpdateData,
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
                    body: {
                        limit: limit,
                        from,
                        namePost,
                        direction
                    },
                    method: 'POST',
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
                    body: {
                        namePost,
                        direction
                    },
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                }
            }
        }),

        deletePostCompetition: builder.mutation<any, any>({
            query: ({token, id}, ) => (
                {
                    url: 'v2/competitions/addToBlackList',
                    body: {
                        id
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'PATCH'
                }
            ),
            invalidatesTags: [{type: 'Competitions', id: 'LIST'}]
        }),

        updateCompetitions: builder.mutation<any, IUpdateInput>({
            query: ({updateData, token}) => ({
                url: 'v2/competitions/update',
                body: updateData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                method: 'PATCH'
            }),
            invalidatesTags: [{type: 'Competitions', id: 'LIST'}]
        }),

    })
});

export const {
    useGetCountСompetitionsQuery,
    useGetCompetitionsQuery,
    useUpdateCompetitionsMutation,
    useDeletePostCompetitionMutation
} = competitionsApi;

import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TTypesUpdateData} from "../types/types";

export interface IGetGrants {
    limit: number,
    from: number,
    namePost: string,
    direction?: string | string[],
    token: string | null
}

interface IGetCountGrants {
    namePost?: string,
    direction?: string | string[],
    token: string | null
}

interface IUpdateInput {
    updateData: TTypesUpdateData,
    token: string | null
}


export const grantsApi = createApi({
    reducerPath: 'grantsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.REACT_APP_SERVER_URL,
        }),
    tagTypes: ['Grants'],
    endpoints: (builder) => ({
        getGrants: builder.query<any, IGetGrants>({
            query: ({limit, from, namePost, direction, token}) => {
                return {
                    url: `v2/grants/get`,
                    body: {
                        limit: limit,
                        from,
                        namePost,
                        direction
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'POST'
                }
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result?.data.map(({ id } : any) => ({ type: 'Grants' as const, id })),
                        { type: 'Grants', id: 'LIST' },
                    ]
                    : [{ type: 'Grants', id: 'LIST' }],
        }),
        getCountGrants: builder.query<any, IGetCountGrants>({
            query: ({namePost, direction, token}) => {
                return {
                    url: `v2/grants/count`,
                    body: {
                        namePost,
                        direction
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'POST'
                }
            }
        }),
        deletePostGrant: builder.mutation<any, any>({
            query: ({token, id}, ) => (
                {
                    url: 'v2/grants/addToBlackList',
                    body: {
                        id
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'PATCH'
                }
            ),
            invalidatesTags: [{type: 'Grants', id: 'LIST'}]
        }),

        updatePostGrant: builder.mutation<any, IUpdateInput>({
            query: ({updateData, token}) => ({
                url: 'v2/grants/update',
                body: updateData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                method: 'PATCH'
            }),
            invalidatesTags: [{type: 'Grants', id: 'LIST'}]
        }),

        getDirections: builder.query<any, any>({
            query: ({token}) => (
                {
                    url:'v2/directions/get',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'GET'
                }
            )
        }),

        getBeautifulStats : builder.query<any, any>({
            query: ({token}) => ({
                url: 'stats/getBeautifulStats',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                method: 'POST'
            })
        })

    })
});

export const {
    useUpdatePostGrantMutation,
    useDeletePostGrantMutation,
    useGetDirectionsQuery,
    useGetBeautifulStatsQuery,
    useGetGrantsQuery,
    useGetCountGrantsQuery,
} = grantsApi;

import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface IGetGrants {
    limit: number,
    from: number,
    namePost: string,
    direction?: string,
    token: string | null
}

interface IGetCountGrants {
    namePost?: string,
    direction?: string,
    token: string | null
}


export const grantsApi = createApi({
    reducerPath: 'grantsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.REACT_APP_SERVER_URL,
            method: 'POST'

        }),
    tagTypes: ['Grants'],
    endpoints: (builder) => ({
        getGrants: builder.query<any, IGetGrants>({
            query: ({limit, from, namePost, direction, token}) => {
                return {
                    url: 'grants/get',
                    body: {
                        limit: limit,
                        from,
                        namePost,
                        direction
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
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
                    url: 'grants/count',
                    body: {
                        namePost,
                        direction
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            }
        }),
        deletePostGrant: builder.mutation<any, number>({
            query: (id, ) => (
                {
                    url: 'grants/delete',
                    body: {
                        id
                    },
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem("token")}`,
                    },
                }
            ),
            invalidatesTags: [{type: 'Grants', id: 'LIST'}]
        }),
        // updatePostGrant: builder.mutation<any, IUpdateData>({
        //     query: (updateData) => ({
        //         url: 'grants/update',
        //         body: updateData
        //     }),
        //     invalidatesTags: [{type: 'Grants', id: 'LIST'}]
        // }),
        getDirectionsGrants: builder.query<any, any>({
            query: ({token}) => (
                {
                    url:'grants/getDirections',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            )
        }),

        getBeautifulStats : builder.query<any, any>({
            query: ({token}) => ({
                url: 'stats/getBeautifulStats',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
        })

    })
});

export const {
    useDeletePostGrantMutation,
    useGetDirectionsGrantsQuery,
    useGetBeautifulStatsQuery,
    useGetGrantsQuery,
    useGetCountGrantsQuery,
} = grantsApi;

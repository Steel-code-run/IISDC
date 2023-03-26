import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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
                    params: {
                        limit: limit,
                        from,
                        namePost,
                        direction
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'GET'
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
                    url: 'v2/grants/count',
                    params: {
                        namePost,
                        'direction[]': direction
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'GET'
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

        // updatePostGrant: builder.mutation<any, IUpdateData>({
        //     query: (updateData) => ({
        //         url: 'grants/update',
        //         body: updateData
        //     }),
        //     invalidatesTags: [{type: 'Grants', id: 'LIST'}]
        // }),

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
    useDeletePostGrantMutation,
    useGetDirectionsQuery,
    useGetBeautifulStatsQuery,
    useGetGrantsQuery,
    useGetCountGrantsQuery,
} = grantsApi;

import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TTypesUpdateData} from "../types/types";

export interface IGetGrants {
    skip: number,
    take: number,
    namePost: string,
    directions?: string | string[],
    token: string | null
}

type IGetCountGrants = Omit<any, 'skip' | 'take'>;

interface IUpdateInput {
    id: number
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
            query: ({skip, take, namePost, directions, token}) => {
                return {
                    url: `v1/grants/`,
                    body: {
                        skip,
                        take,
                        namePost,
                        directions: JSON.stringify(directions)
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
                        ...result?.data.map(({id}: any) => ({type: 'Grants' as const, id})),
                        {type: 'Grants', id: 'LIST'},
                    ]
                    : [{type: 'Grants', id: 'LIST'}],
        }),
        getCountGrants: builder.query<any, IGetCountGrants>({
            query: ({namePost,
                        directions,
                        token}) => {
                return {
                    url: `v1/grants/count`,
                    body: {
                        namePost,
                        directions: JSON.stringify(directions)
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'POST'
                }
            }
        }),
        deletePostGrant: builder.mutation<any, any>({
            query: ({token, id},) => (
                {
                    url: 'v1/grants/addToBlackList',
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
            query: ({id, updateData, token}) => ({
                url: 'v1/grants',
                body: {
                    id,
                    data: {
                        ...updateData
                    }
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                method: 'PATCH'
            }),
            invalidatesTags: [{type: 'Grants', id: 'LIST'}]
        }),

    })
});

export const {
    useUpdatePostGrantMutation,
    useDeletePostGrantMutation,
    useGetGrantsQuery,
    useGetCountGrantsQuery,
} = grantsApi;

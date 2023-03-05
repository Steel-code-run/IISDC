import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IUpdateData} from "../components/UI/PopupPost/PopupPost";

export interface IGetGrants {
    limit: number,
    from: number,
    namePost: string,
    direction?: string
}
export interface IGetCompetitions {
    limit: number,
    from: number,
    namePost: string,
    direction?: string
}

interface IGetCountGrants {
    namePost?: string,
    direction?: string
}

export const grantsApi = createApi({
    reducerPath: 'grantsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.REACT_APP_SERVER_URL,
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQllQQVNTIiwicm9sZSI6OTk5LCJpZCI6LTEwMCwiaWF0IjoxNjc3MDYzODczLCJleHAiOjE3MDUwNTc0NzN9.tMDWPoOEZ2_m4ynvu1uB3noj_p-raHpMU7FHklXjfUY'
            },
            method: 'POST'

        }),
    tagTypes: ['Grants'],
    endpoints: (builder) => ({

        getGrants: builder.query<any, IGetGrants>({
            query: ({limit, from, namePost, direction}) => {
                return {
                    url: 'grants/get',
                    body: {
                        limit: limit,
                        from,
                        namePost,
                        direction
                    }
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
            query: ({namePost, direction}) => {
                return {
                    url: 'grants/count',
                    body: {
                        namePost,
                        direction
                    }
                }
            }
        }),
        deletePostGrant: builder.mutation<any, number>({
            query: (id) => (
                {
                    url: 'grants/delete',
                    body: {
                        id
                    }
                }
            ),
            invalidatesTags: [{type: 'Grants', id: 'LIST'}]
        }),
        updatePostGrant: builder.mutation<any, IUpdateData>({
            query: (updateData) => ({
                url: 'grants/update',
                body: updateData
            }),
            invalidatesTags: [{type: 'Grants', id: 'LIST'}]
        }),
        getDirectionsGrants: builder.query<any, void>({
            query: () => 'grants/getDirections'
        }),

        getBeautifulStats : builder.query<any, void>({
            query: () => 'stats/getBeautifulStats'
        })

    })
});

export const {
    useUpdatePostGrantMutation,
    useDeletePostGrantMutation,
    useGetDirectionsGrantsQuery,
    useGetBeautifulStatsQuery,
    useGetGrantsQuery,
    useGetCountGrantsQuery,
} = grantsApi;

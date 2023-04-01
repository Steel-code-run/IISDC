import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TTypesUpdateData} from "../types/types";

export interface IGetInternships {
    limit: number,
    from: number,
    namePost: string,
    direction?: string | string[],
    token: string | null
}

interface IGetCountInternships {
    namePost?: string,
    direction?: string | string[],
    token: string | null
}

interface IUpdateInput {
    updateData: TTypesUpdateData,
    token: string | null
}


export const internshipsApi = createApi({
    reducerPath: 'InternshipsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.REACT_APP_SERVER_URL,
        }),
    tagTypes: ['Internships'],

    endpoints: (builder) => ({

        getInternships: builder.query<any, IGetInternships>({
            query: ({limit, from, namePost, direction, token}) => {
                return {
                    url: `v2/internships/get`,
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
                        ...result?.data.map(({ id } : any) => ({ type: 'Internships' as const, id })),
                        { type: 'Internships', id: 'LIST' },
                    ]
                    : [{ type: 'Internships', id: 'LIST' }],
        }),

        getCountInternships: builder.query<any, IGetCountInternships>({
            query: ({namePost, direction, token}) => {
                return {
                    url: `v2/internships/count`,
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

        deletePostInternship: builder.mutation<any, any>({
            query: ({token, id}, ) => (
                {
                    url: 'v2/internships/addToBlackList',
                    body: {
                        id
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'PATCH'
                }
            ),
            invalidatesTags: [{type: 'Internships', id: 'LIST'}]
        }),

        updatePostInternship: builder.mutation<any, IUpdateInput>({
            query: ({updateData, token}) => ({
                url: 'v2/internships/update',
                body: updateData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                method: 'PATCH'
            }),
            invalidatesTags: [{type: 'Internships', id: 'LIST'}]
        }),


    })
});

export const {
    useGetInternshipsQuery,
    useGetCountInternshipsQuery,
    useUpdatePostInternshipMutation,
    useDeletePostInternshipMutation
} = internshipsApi;

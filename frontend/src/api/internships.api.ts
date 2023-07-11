import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TTypesUpdateData} from "../types/types";
import {TPostType} from "../types/serial/parser";

export interface IGetInternships {
    skip: number,
    take: number,
    extended: boolean
    namePost: string,
    directions?: string | string[],
    token: string | null
}

interface IUpdateInput {
    id: number
    updateData: TTypesUpdateData<TPostType>,
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
            query: ({skip, take, extended, namePost, directions, token}) => {
                return {
                    url: `v1/internships`,
                    body: {
                        skip,
                        take,
                        extended,
                        where: (directions?.length) ? {
                            "namePost": {
                                contains: namePost
                            },

                            "OR": (typeof directions === 'string') ? {
                                "directions": {
                                    contains: directions
                                }
                            } : directions?.map((dir) => {
                                return {
                                    "directions": {
                                        contains: dir
                                    }
                                }
                            })
                        } : {
                            "namePost": {
                                contains: namePost
                            },
                        }
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

        deletePostInternship: builder.mutation<any, any>({
            query: ({token, id}, ) => (
                {
                    url: 'v1/internships',
                    body: {
                        skip: 0,
                        take: 1
                    },
                    params: {
                        id
                    },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    method: 'DELETE'
                }
            ),
            invalidatesTags: [{type: 'Internships', id: 'LIST'}]
        }),

        updatePostInternship: builder.mutation<any, IUpdateInput>({
            query: ({id, updateData,
                        token}) => ({
                url: 'v1/internships',
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
            invalidatesTags: [{type: 'Internships', id: 'LIST'}]
        }),


    })
});

export const {
    useGetInternshipsQuery,
    useUpdatePostInternshipMutation,
    useDeletePostInternshipMutation
} = internshipsApi;

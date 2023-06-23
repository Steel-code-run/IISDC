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

type IGetCountInternships = Omit<any, 'skip' | 'take' | 'extended'>;

interface IUpdateInput {
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

        getCountInternships: builder.query<any, IGetCountInternships>({
            query: ({namePost, directions, token}) => {
                return {
                    url: `v1/internships/count`,
                    body: {
                        where: (directions?.length) ? {
                            "namePost": {
                                contains: namePost
                            },

                            "OR": (typeof directions === 'string') ? {
                                "directions": {
                                    contains: directions
                                }
                            } : directions?.map((dir: string) => {
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
            }
        }),

        deletePostInternship: builder.mutation<any, any>({
            query: ({token, id}, ) => (
                {
                    url: 'v1/internships/addToBlackList',
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
                url: 'v1/internships/update',
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

import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TTypesUpdateData} from "../types/types";
import {TPostType} from "../types/serial/parser";

export interface IGetGrants {
    skip: number,
    take: number,
    extended: boolean
    namePost: string,
    directions?: string | string[],
    token: string | null
    deadlineBy?: string | null | undefined
}

interface IUpdateInput {
    id: number
    updateData: Partial<TTypesUpdateData<TPostType>>,
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
            query: ({skip, take, extended, namePost, directions, token, deadlineBy}) => {

                const objData = {

                        skip,
                        take,
                        extended,
                        where: (directions?.length) ? {
                            "namePost": {
                                contains: namePost
                            },
                            blackListed: false,
                            deadline: {
                                gte: deadlineBy
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
                            blackListed: false,
                            deadline: {
                                gte: deadlineBy
                            }
                        }
                    };

                if(!deadlineBy) {
                    //@ts-ignore
                    delete objData?.['where']?.['deadline']
                }
                return {
                    url: `v1/grants`,
                    body: objData,
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

        deletePostGrant: builder.mutation<any, any>({
            query: ({token, id},) => (
                {
                    url: 'v1/grants',
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
} = grantsApi;

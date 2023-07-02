import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {TTypesUpdateData} from "../types/types";
import {TPostType} from "../types/serial/parser";

// import {IUpdateData} from "../components/UI/PopupPost/PopupPost";

export interface IGetCompetitions {
    take: number,
    skip: number,
    extended: boolean,
    namePost: string,
    directions?: string[] | string,
    token: string | null
    deadlineBy?: string | null | undefined

}

type IGetCountCompetitions = Omit<IGetCompetitions, 'take' | 'skip' | 'extended'>;

interface IUpdateInput {
    id: number
    updateData: TTypesUpdateData<TPostType>,
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
            query: ({
                        take,
                        skip,
                        extended,
                        namePost,
                        directions, deadlineBy,
                        token
                    }) => {


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
                    url: 'v1/competitions',
                    body: objData,
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
                        ['Competitions'],
                    ]
                    : ['Competitions'],
        }),
        getCountСompetitions: builder.query<any, IGetCountCompetitions>({
            query: ({
                        namePost,
                        directions,
                        token,
                        deadlineBy
                    }) => {
                return {
                    url: 'v1/competitions/count',
                    body: {
                        where: (directions?.length) ? {
                            "namePost": {
                                contains: namePost
                            },
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
                            deadline: {
                                gte: deadlineBy
                            },
                        }
                    },
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                }
            }
        }),

        deletePostCompetition: builder.mutation<any, any>({
            query: ({token, id},) => (
                {
                    url: 'v1/competitions',
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
                    method: 'PATCH'
                }
            ),
            invalidatesTags: ['Competitions']
        }),

        updateCompetitions: builder.mutation<any, IUpdateInput>({
            query: ({id, updateData, token}) => ({
                url: 'v1/competitions',
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
            invalidatesTags: ['Competitions']
        }),

    })
});

export const {
    useGetCountСompetitionsQuery,
    useGetCompetitionsQuery,
    useUpdateCompetitionsMutation,
    useDeletePostCompetitionMutation
} = competitionsApi;

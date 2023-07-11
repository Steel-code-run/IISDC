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
    useGetCompetitionsQuery,
    useUpdateCompetitionsMutation,
    useDeletePostCompetitionMutation
} = competitionsApi;

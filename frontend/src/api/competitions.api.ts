import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IUpdateData} from "../components/UI/PopupPost/PopupPost";

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

interface IGetCountCompetitions extends IGetCountGrants {

}


export const competitionsApi = createApi({
    reducerPath: 'competitionsApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.REACT_APP_SERVER_URL,
            headers: {
                'Authorization': `Bearer ${window.localStorage.token}`
            },
            method: 'POST'

        }),
    tagTypes: ['Competitions'],
    endpoints: (builder) => ({

        getCompetitions: builder.query<any, IGetCompetitions>({
            query: ({limit, from, namePost, direction}) => {
                return {
                    url: 'competitions/get',
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
                        ...result?.data.map(({id}: any) => ({type: 'Competitions' as const, id})),
                        {type: 'Competitions', id: 'LIST'},
                    ]
                    : [{type: 'Competitions', id: 'LIST'}],
        }),
        getCountСompetitions: builder.query<any, IGetCountCompetitions>({
            query: ({namePost, direction}) => {
                return {
                    url: 'competitions/count',
                    body: {
                        namePost,
                        direction
                    }
                }
            }
        }),
        getDirectionsCompetitions: builder.query<any, void>({
            query: () => 'competitions/getDirections'
        }),
        updateCompetitions: builder.mutation<any, IUpdateData>({
            query: (updateData) => ({
                url: 'competitions/update',
                body: updateData
            }),
            invalidatesTags: [{type: 'Competitions', id: 'LIST'}]
        }),

    })
});

export const {
    useUpdateCompetitionsMutation,
    useGetDirectionsCompetitionsQuery,
    useGetCountСompetitionsQuery,
    useGetCompetitionsQuery
} = competitionsApi;

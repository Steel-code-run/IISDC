import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const auxiliaryApi = createApi({
    reducerPath: 'auxiliaryApi',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.REACT_APP_SERVER_URL,
        }),
    endpoints: (builder) => ({

        getDirections: builder.query<any, any>({
            query: ({token}) => (
                {
                    url:'v1/directions/get',
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
    useGetDirectionsQuery,
    useGetBeautifulStatsQuery
} = auxiliaryApi
import '@reduxjs/toolkit/query/react';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER_URL}),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => 'posts',
        }),

    })
});

export const {useGetPostsQuery} = postsApi;

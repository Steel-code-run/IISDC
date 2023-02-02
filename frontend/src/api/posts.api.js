"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetPostsQuery = exports.postsApi = void 0;
require("@reduxjs/toolkit/query/react");
const react_1 = require("@reduxjs/toolkit/query/react");
exports.postsApi = (0, react_1.createApi)({
    reducerPath: 'postsApi',
    baseQuery: (0, react_1.fetchBaseQuery)({ baseUrl: process.env.REACT_APP_SERVER_URL }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => 'posts',
        }),
        updatePost: builder.mutation({
            query: (post) => ({
                url: `posts/${post.id}`,
                method: 'PUT',
                body: post
            })
        }),
        directions: builder.query({
            query: () => 'getGrantDirections',
        }),
        countPosts: builder.query({
            query: () => 'countPosts',
        }),
    })
});
exports.useGetPostsQuery = exports.postsApi.useGetPostsQuery;
//# sourceMappingURL=posts.api.js.map
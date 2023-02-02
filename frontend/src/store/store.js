"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const posts_api_1 = require("../api/posts.api");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        [posts_api_1.postsApi.reducerPath]: posts_api_1.postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(posts_api_1.postsApi.middleware)
});
//# sourceMappingURL=store.js.map
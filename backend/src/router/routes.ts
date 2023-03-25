export const routes = {
    v2: {
        directions: {
            get: "/v2/directions/get",
            add: "/v2/directions/add",
            remove: "/v2/directions/remove",
            update: "/v2/directions/update",
        },
        grants: {
            get: "/v2/grants/get",
            // add: "/v2/grants/add",
            delete: "/v2/grants/delete",
            addToBlackList: "/v2/grants/addToBlackList",
            removeFromBlackList: "/v2/grants/removeFromBlackList",
            update: "/v2/grants/update",
            count: "/v2/grants/count"
        },
        competitions: {
            get: "/v2/competitions/get",
            // add: "/v2/competitions/add",
            delete: "/v2/competitions/delete",
            addToBlackList: "/v2/competitions/addToBlackList",
            removeFromBlackList: "/v2/competitions/removeFromBlackList",
            update: "/v2/competitions/update",
            count: "/v2/competitions/count"
        },
    }
}
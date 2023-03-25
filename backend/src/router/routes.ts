export const routes = {
    v2: {
        directions: {
            getDirections: "/v2/directions/getDirections",
            addConstDirection: "/v2/directions/getDirections",
            removeConstDirection: "/v2/directions/removeConstDirection",
        },
        grants: {
            getGrants: "/v2/grants/get",
            addGrant: "/v2/grants/add",
            deleteGrant: "/v2/grants/delete",
            addGrantToBlackList: "/v2/grants/addToBlackList",
            removeGrantFromBlackList: "/v2/grants/removeFromBlackList",
            updateGrant: "/v2/grants/update"
        },
    }
}
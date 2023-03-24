export const routes = {
    v2: {
        directions: {
            getDirections: "/v2/directions/getDirections",
            addConstDirection: "/v2/directions/getDirections",
            removeConstDirection: "/v2/directions/removeConstDirection",
        },
        grants: {
            getGrants: "/v2/grants/getGrants",
            addGrant: "/v2/grants/addGrants",
            deleteGrant: "/v2/grants/deleteGrant",
            addGrantToBlackList: "/v2/grants/addGrantToBlackList",
            removeGrantFromBlackList: "/v2/grants/removeGrantFromBlackList",
            updateGrant: "/v2/grants/updateGrant"
        },
    }
}
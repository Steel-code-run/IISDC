import {TGrant} from "@iisdc/types";

export const grantToString = (grant:TGrant) =>{
    const name = grant.namePost.length > 4 ? grant.namePost +"\n\n" : ""
    const direction = grant.direction.length > 4 ? grant.direction +"\n\n" : ""
    const organization = grant.organization.length > 4 ? grant.organization +"\n\n" : ""
    return name+ direction+ organization+ grant.link
}
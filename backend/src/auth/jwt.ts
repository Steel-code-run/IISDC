import * as jwt from "jsonwebtoken";
import {IUser} from "@iisdc/types";

const signature = "secretWordImposi213412mlnvjoh32nm4";
const expiresIn = "6h";

export function generateBYPASSToken(user:IUser) {
    try {
        return jwt.sign(user, signature, {expiresIn:"324d"});
    } catch (e) {
        return undefined
    }
}
export function generateToken(user:IUser) {
    try {
        delete user.password

        return jwt.sign(user, signature, {expiresIn});
    } catch (e) {
        return undefined
    }
}

export function verifyToken(token:string) {
    try {
        return jwt.verify(token, signature);
    } catch (e) {
        return undefined
    }
}
import * as jwt from "jsonwebtoken";
import {IUser} from "@iisdc/types";

const signature = "secretWordImposi213412mlnvjoh32nm4";
const expiresIn = "6h";
export function generateToken(user:IUser) {
    try {
        return jwt.sign(user, signature, {expiresIn});
    } catch (e) {
        return undefined
    }
}

export function verifyToken(token:string) {
    try {
        return jwt.verify(token, signature) as IUser;
    } catch (e) {
        return undefined
    }
}
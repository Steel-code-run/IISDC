import {Request} from "express";
import {IUser} from "@iisdc/types";

export interface ICustomRequest extends Request {
    user?: IUser;
}
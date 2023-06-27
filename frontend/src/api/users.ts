import axios from "axios";
import {defaultHeaders, serverUrl} from "../config/apiConfig";

export const getUserById = async (skip: number, take: number, id: string) => {

    const res = await axios.post(`${serverUrl}v1/users/get`, {
        skip,
        take,
        where:{
            id: parseInt(id)
        }
    }, {
        headers: defaultHeaders
    })
    return res.data[0]
}
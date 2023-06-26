import {defaultHeaders, serverUrl} from "../config/apiConfig";
import axios from "axios";

export const getLogs = async (skip, take, orderBy, where) => {

    const res = await axios.post(`${serverUrl}v1/accessing-logs`, {
        skip,
        take,
        where,
        orderBy
    }, {
         headers: {
                ...defaultHeaders
    }
    })
    return res.data
}
import axios from "axios";
import {defaultHeaders, serverUrl} from "../config/apiConfig";

export const getRoutes = async (skip, take) => {
    const res = await axios.post(`${serverUrl}v1/resources/get`, {
        skip,
        take,
        where: {}
    }, {
        headers: defaultHeaders
    })

    return res.data
}
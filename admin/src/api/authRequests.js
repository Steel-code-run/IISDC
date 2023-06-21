import axios from "axios";
import {defaultHeaders, serverUrl} from "../config/apiConfig";

export const login = async (data) => {

    const res = await axios.post(`${serverUrl}v1/users/login`,
        {
            ...data
        }, {
        ...defaultHeaders
        })

    return res.data
}

// export const register = async (data) => {
//
// }
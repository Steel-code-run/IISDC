import axios from "axios";
import {defaultHeaders, serverUrl} from "../config/apiConfig";

export const login = async (name, password) => {

    const res = await axios.post(`${serverUrl}v1/users/login`,
        {
            name,
            password
        }, {
        ...defaultHeaders
        })

    return res.data
}

// export const register = async (data) => {
//
// }
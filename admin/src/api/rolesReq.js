import axios from "axios";
import {serverUrl, defaultHeaders} from "../config/apiConfig";

export const getRoles = async () => {
    const res = await axios.post(`${serverUrl}v1/roles`, {

    }, {
        headers: defaultHeaders
    })
    return res.data
}
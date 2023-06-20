import {defaultHeaders, serverUrl} from "../config/apiConfig";
import axios from "axios";

export const getLogs = async () => {

    const res = await axios.post(`${serverUrl}v1/accessing-logs`, {}, {
        ...defaultHeaders
    })
    return res.data
}
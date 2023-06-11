import axios from "axios";
import {defaultHeaders, serverUrl} from "../config/apiConfig";

export const getParsers = async () => {
    const res = await axios.get(`${serverUrl}v1/parsers`, {
        ...defaultHeaders
    })
    return res.data
}
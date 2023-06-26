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

export const getWarnings = async () => {
    const res = await axios.post(`${serverUrl}v1/accessing-logs/warnings`, {
        where: {
            isSolved: false
        }
    }, {
        headers: defaultHeaders
    })
    return res.data
}

export const updateWarnings = async ({id, isSolved}) => {
    const res = await axios.post(`${serverUrl}v1/accessing-logs/warnings/update`, {
        id,
        data: {
            isSolved
        }
    }, {
        headers: defaultHeaders
    })
    return res.data
}
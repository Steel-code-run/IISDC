import axios from "axios";
import {defaultHeaders, serverUrl} from "../config/apiConfig";

export const getParsers = async (skip, take) => {

    const res = await axios.post(`${serverUrl}v1/parsers`,
        {
            skip,
            take
        }, {
        ...defaultHeaders
    })
    return res.data
}

export const getCountParsers = async () => {
    const res =  await axios.post(`${serverUrl}v1/parsers/count`, {}, {
        ...defaultHeaders
    })
    return res.data.count
}

export const updateParsers = async (updateData) => {

    return await axios.patch(`${serverUrl}v1/parsers`, {
        ...updateData

    }, {
        ...defaultHeaders
    })

}

export const getParsingSettings = async () => {
    const res =  await axios.post(`${serverUrl}v1/settings`, {}, {
        ...defaultHeaders
    })
    return res.data
}

export const updateParsingSettings = async (updateData) => {
    //console.log(updateData)
    const res = await axios.post(`${serverUrl}v1/settings/update`, {
        ...updateData
    }, {
        ...defaultHeaders
    })
    return res.data
}
import axios from "axios";
import {defaultHeaders, serverUrl} from "../config/apiConfig";

export const getParsers = async (skip, take) => {

    const res = await axios.post(`${serverUrl}v1/parsers`,
        {
            skip,
            take
        }, {
            headers: {

                ...defaultHeaders
            }
        })
    return res.data
}

export const getCountParsers = async () => {
    const res = await axios.post(`${serverUrl}v1/parsers/count`, {}, {
         headers: {
                ...defaultHeaders
    }
    })
    return res.data.count
}

export const updateParsers = async (updateData) => {

    try {

        const res = await axios.patch(`${serverUrl}v1/parsers`, {
            ...updateData

        }, {
             headers: {
                ...defaultHeaders
    }
        })
        return res.data
    } catch (err) {
        return err.data
    }

}

export const getParsingSettings = async () => {
    const res = await axios.post(`${serverUrl}v1/settings`, {}, {
         headers: {
                ...defaultHeaders
    }
    })
    return res.data
}

export const updateParsingSettings = async (updateData) => {
    //console.log(updateData)
    const res = await axios.post(`${serverUrl}v1/settings/update`, {
        ...updateData
    }, {
         headers: {
                ...defaultHeaders
    }
    })
    return res.data
}
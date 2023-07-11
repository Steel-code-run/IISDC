import axios from "axios";
import {defaultHeaders, serverUrl} from "../../config/apiConfig";

export const getCompetitions = async (skip, take, config, where = {}) => {
    const res = await axios.post(`${serverUrl}v1/competitions`,
        {
            skip,
            take,
            ...config,
            where
        }, {
            headers: {
                ...defaultHeaders
            }
        })

    return res.data
}

export const deleteCompetition = async (id) => {
    const res = await axios.delete(`${serverUrl}v1/competitions`, {
        data: {
            id
        },
        headers: defaultHeaders
    })

    return res.data
}

export const updateCompetition = async (updateData) => {
    try {
        const res = await axios.patch(`${serverUrl}v1/competitions`,
            {
                ...updateData
            }, {
                headers: defaultHeaders
            })
        return res.data

    } catch (e) {
        return e
    }
}
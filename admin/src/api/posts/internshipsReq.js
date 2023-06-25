import axios from "axios";
import {defaultHeaders, serverUrl} from "../../config/apiConfig";

export const getInternships = async (skip, take, config, where ={}) => {
    const res = await axios.post(`${serverUrl}v1/internships`,
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

export const getCountInternships = async () => {
    const res = await axios.post(`${serverUrl}v1/internships/count`, {
        skip: 0,
        take: 0
    }, {
         headers: {
                ...defaultHeaders
    }
    })

    return res.data
}

export const deleteInternship = async (id) => {
    const res = await axios.delete(`${serverUrl}v1/internships`, {
        data: {
            id
        },
        headers: defaultHeaders
    })
    return res.data
}

export const updateInternship = async (updateData) => {
    try {
        const res = await axios.patch(`${serverUrl}v1/internships`,
            {
                ...updateData
            },{
                headers: defaultHeaders
            })
        return res.data

    } catch (e) {
        return e
    }
}
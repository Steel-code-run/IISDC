import axios from "axios";
import {defaultHeaders, serverUrl} from "../../config/apiConfig";

export const getGrants = async (skip, take, config, where ={}) => {
    const res = await axios.post(`${serverUrl}v1/grants`,
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

export const getCountGrants = async (where) => {
    // console.log(where)
    const res = await axios.post(`${serverUrl}v1/grants/count`, {
        skip: 0,
        take: 0,
        where
    }, {
         headers: {
                ...defaultHeaders
    }
    })

    return res.data
}

export const deleteGrant = async (id) => {
    const res = await axios.delete(`${serverUrl}v1/grants`, {
        data: {
            id
        },
        headers: defaultHeaders
    })
    return res.data
}

export const updateGrant = async (updateData) => {
    try {
        const res = await axios.patch(`${serverUrl}v1/grants`,
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
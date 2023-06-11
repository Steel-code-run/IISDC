import axios from "axios";
import {defaultHeaders, serverUrl} from "../config/apiConfig";


export const responseUser = async (page, rowsPerPage, id) => {
    const {data} = await axios.post(`${serverUrl}v1/users/get`, {
            skip: page,
            take: rowsPerPage,

            where: (!id) ? {} : {
                "id": parseInt(id)
            }
        },
        {
            headers: {
                ...defaultHeaders
            }

        });
    return data

}

export const addUser = async (data) => {
    try {
        const res = await axios.post(`${serverUrl}v1/users`, {
            ...data
        }, {
            headers: {
                ...defaultHeaders
            }
        });

        return res.data
    }
    catch(err) {
        return err.response.data
    }

}

export const deleteUser = async ({id}) => {
    return await axios.delete(`${serverUrl}v1/users`, {
        data: {
            id
        },
        headers: {
            ...defaultHeaders
        }
    })
}

export const updateUser = async (data) => {
    return await axios.patch(`${serverUrl}v1/users`, {
        ...data
    }, {
        headers: {
            ...defaultHeaders
        }
    })

}

export const getCountUser = async () => {
    return await axios.get(`${serverUrl}v1/grants/count`, {
        headers: {
            ...defaultHeaders
        }
    })
}
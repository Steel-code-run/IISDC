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
        const res = await axios.post(`${serverUrl}v1/users`,
            {
                ...data
            }, {
                headers: {
                    ...defaultHeaders
                }
            });

        return res.data
    } catch (err) {
        return err.response.data
    }

}

export const deleteUser = async ({id}) => {
    const res =  await axios.delete(`${serverUrl}v1/users`, {
        data: {
            id
        },
        headers: {
            ...defaultHeaders
        }
    })
    return res.data
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
    const res =  await axios.post(`${serverUrl}v1/users/count`,{}, {
        headers: {
            ...defaultHeaders
        }
    })
    return res.data.count
}
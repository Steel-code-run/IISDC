import axios from "axios";


export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpZCI6MiwiaWF0IjoxNjg0MDczMzIwLCJleHAiOjE2ODQxNTk3MjB9.jceAzQVla2WAfPMB1mctsqGSETYwzlIspBfqEQMqUpo'

const defaultHeaders = {
    Authorization: 'Bearer ' + token
}

const serverUrl = 'http://localhost:3000/'

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